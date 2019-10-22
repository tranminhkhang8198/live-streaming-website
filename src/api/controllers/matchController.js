const Match = require("./../models/matchModel");
const Streaming = require("./../models/streamingModel");
const Tournament = require("./../models/tournamentModel");
const APIFeature = require("./../utils/apiFeatures");
const SportType = require('./../models/sportTypeModel');
const fs = require("fs");
const path = require('path');

function checkFileType(filename) {
  if (!filename.match(/.(jpg|jpeg|png|gif)$/i)) return false;
  return true;
}

function validateImg(files, message) {
  for (file in files) {
    if (!checkFileType(files[file].name)) {
      message.push(`${files[file].name} is not an image. Please choose an image`);
    }
  }
}

function saveImg(file) {
  let imgUrl = '';
  if (file) {
    const filename =
      file.name
      .split(".")
      .slice(0, -1)
      .join(".") +
      "-" +
      Date.now();

    const extname = file.name.split(".").slice(-1)[0];
    imgUrl = filename + "." + extname;

    file.mv(path.join(__dirname, '../uploads/images/' + imgUrl));
  }

  return imgUrl;
}

async function checkTournamentExist(tournament_name) {
  const tournament = await Tournament.findOne({
    name: tournament_name
  });

  return tournament;
}

async function createNewTournament(tournament_name, tournamentImgUrl, match) {
  const tournament = await Tournament.create({
    name: tournament_name,
    imgUrl: tournamentImgUrl,
    matches: match
  });

  return tournament;
}


async function updateTournament(tournament_name, tournamentImgUrl, match) {
  // Retrieve tournament
  const tournament = await Tournament.findOne({
    name: tournament_name
  });

  if (tournament.imgUrl != "") {
    removeImg(tournament.imgUrl);
  }

  const newTournament = await Tournament.findByIdAndUpdate({
    _id: tournament._id
  }, {
    $push: {
      matches: match
    },
    imgUrl: tournamentImgUrl
  }, {
    new: true,
    runValidators: true
  });

  return newTournament;
}


async function checkSportTypeExist(id) {
  const sportType = await SportType.findOne({
    _id: id
  });

  if (!sportType) {
    return false;
  }
  return true;
}

function removeImg(imgUrl) {

  const img_path = path.join(__dirname, '../uploads/images/' + imgUrl);
  console.log(img_path);

  if (fs.existsSync(img_path)) {
    console.log("something");
    fs.unlinkSync(img_path);
  }
}

exports.getAllMatch = async (req, res) => {
  try {
    // // EXCUTE QUERY
    const features = new APIFeature(
        Match.find().populate("streaming", "streamingUrl -_id"),
        req.query
      )
      .filter()
      .time()
      .sort()
      .limitFields()
      .paginate();

    const matches = await features.query;

    res.status(200).json({
      matches
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate("streaming", "streamingUrl -_id");

    res.status(200).json({
      status: "success",
      data: {
        match
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};


exports.createMatch = async (req, res) => {
  try {
    let message = [];

    // CHECKING StreamingUrl exist
    if (!req.body.streamingUrl) {
      message.push("Please provide streaming url");
    }

    // CHECKING TOURNAMENT
    if (!req.body.tournament) {
      message.push("Please enter tournament");
    }

    // CHECK SPORT TYPE EXIST
    if (!(await checkSportTypeExist(req.body.type))) {
      message.push("Sport type doesn't exist");
    }

    // UPLOAD FC IMAGE TO SERVER
    let fc1ImgUrl = "";
    let fc2ImgUrl = "";
    let tournamentImgUrl = "";
    if (req.files) {
      validateImg(req.files, message);

      if (message.length == 0) {
        fc1ImgUrl = saveImg(req.files.fc1Img);
        fc2ImgUrl = saveImg(req.files.fc2Img);
        tournamentImgUrl = saveImg(req.files.tournamentImg);
      }
    }

    if (message.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: message
      });
    }

    // CREATE STREAMING FOR NEW MATCH
    const newStreaming = await Streaming.create(req.body);
    const streaming_id = newStreaming._id;

    // CREATE NEW MATCH
    queryStr = {
      ...req.body
    };
    queryStr["streaming"] = streaming_id;
    queryStr["fc1ImgUrl"] = fc1ImgUrl;
    queryStr["fc2ImgUrl"] = fc2ImgUrl;
    queryStr["tournamentImgUrl"] = tournamentImgUrl;

    const newMatch = await Match.create(queryStr);


    // ADD MATCH TO TOURNAMENT AND UPDATE TOURNAMENT IMG IF HAVE
    // Checking tournament exist and create new one if not
    let newTournament = null;
    if (!(await checkTournamentExist(req.body.tournament))) {
      // Create new one
      newTournament = await createNewTournament(req.body.tournament, tournamentImgUrl, newMatch);
    } else {
      // Retrieve and update
      newTournament = await updateTournament(req.body.tournament, tournamentImgUrl, newMatch);
    }

    res.status(201).json({
      streaming: newStreaming,
      match: newMatch,
      tournament: newTournament
    });

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  };
};

exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findOne({
      _id: req.params.id
    });

    if (match) {
      var updated_match = await Match.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    } else {
      return res.status(404).json({
        status: 'fail',
        message: "Match ID does't exist"
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        updated_match
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findOne({
      _id: req.params.id
    });

    if (match) {
      // DELETE MATCH
      const match = await Match.findByIdAndDelete(req.params.id);

      // DELETE STREAMING OF THIS MATCH
      const streaming = await Streaming.findByIdAndDelete(match.streaming);

      // REMOVE IMG FROM SERVER
      if (match.fc1ImgUrl != "") {
        removeImg(match.fc1ImgUrl);
      }

      if (match.fc2ImgUrl != "") {
        removeImg(match.fc2ImgUrl);
      }
    } else {
      return res.status(404).json({
        status: 'fail',
        message: "Match ID does't exist"
      });
    }

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};