const Match = require("./../models/matchModel");
const Streaming = require("./../models/streamingModel");
const Tournament = require("./../models/tournamentModel");
const APIFeature = require("./../utils/apiFeatures");
const SportType = require("./../models/sportTypeModel");
const fs = require("fs");
const path = require("path");

function checkFileType(filename) {
  if (!filename.match(/.(jpg|jpeg|png|gif)$/i)) return false;
  return true;
}

function validateImg(files, message) {
  for (file in files) {
    if (!checkFileType(files[file].name)) {
      message.push(
        `${files[file].name} is not an image. Please choose an image`
      );
    }
  }
}

function saveImg(file) {
  let imgUrl = "/images/representative.jpg";
  if (file) {
    const filename =
      file.name
      .split(".")
      .slice(0, -1)
      .join(".") +
      "-" +
      Date.now();

    const extname = file.name.split(".").slice(-1)[0];
    const img = filename + "." + extname;

    file.mv(path.join(__dirname, "../../uploads/" + img));

    imgUrl = "/uploads/" + img;
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
    tournamentImgUrl: tournamentImgUrl,
    matches: match
  });

  return tournament;
}

async function updateTournament(tournament_name, tournamentImgUrl, match) {
  // Retrieve tournament
  const tournament = await Tournament.findOne({
    name: tournament_name
  });

  if (tournament.tournamentImgUrl != "") {
    removeImg(tournament.tournamentImgUrl);
  }

  const newTournament = await Tournament.findByIdAndUpdate({
    _id: tournament._id
  }, {
    $push: {
      matches: match
    },
    tournamentImgUrl: tournamentImgUrl
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

  return sportType;
}

function removeImg(imgUrl) {
  const img_path = path.join(__dirname, "../../uploads/" + imgUrl);
  console.log(img_path);

  if (fs.existsSync(img_path)) {
    console.log("something");
    fs.unlinkSync(img_path);
  }
}

async function getTypeId(name) {
  let id = "";
  const sportType = await SportType.findOne({
    name: name
  });

  if (sportType) {
    id = sportType._id;
  }

  return id;
}


exports.getAllMatch = async (req, res) => {
  try {
    // EXCUTE QUERY
    let typeId = "";

    if (req.query.type) {
      typeId = await getTypeId(req.query.type);

      if (typeId == "") {
        res.status(404).json({
          status: "fail",
          message: `Sport type ${typeId} doesn't exist`
        });
      }
    }

    const features = new APIFeature(
        Match.find()
        .populate("streaming", "streamingUrl status streamingTitle -_id")
        .populate("type", "name -_id"),
        req.query,
        typeId
      )
      .filter()
      .time()
      .type()
      .sort()
      .limitFields()
      .paginate();

    const matches = await features.query;

    // GET TOURNAMENT FOR EACH MATCH
    let response = [];

    for (var i in matches) {
      const result = {};

      const tournament = await Tournament.findOne({
        matches: matches[i]._id
      });

      result["match"] = matches[i];
      result["tournament"] = {
        name: tournament.name,
        tournamentImgUrl: tournament.tournamentImgUrl
      };

      response.push(result);
    }

    // DIVIDE MATCH INTO TODAY AND TOMORROW IF TYPE WAS SUBMITTED
    if (req.query.type) {
      const todays = [];
      const tomorrows = [];

      const today = new Date();
      const today_str = today.toISOString().split("T")[0];

      const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))
      const tomorrow_str = tomorrow.toISOString().split("T")[0];

      for (var i in response) {
        const date_tr = response[i].match.time.toISOString().split("T")[0];

        if (date_tr == today_str) {
          todays.push(response[i]);
        }

        if (date_tr == tomorrow_str) {
          tomorrows.push(response[i]);
        }
      }

      response = {};

      response["today"] = todays;
      response["tomorrow"] = tomorrows;
    }

    res.status(200).json({
      response
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
    const match = await Match.findById(req.params.id)
      .populate("streaming", "streamingUrl -_id")
      .populate("type", "name -_id");

    // GET TOUNARMENT FOR MATCH
    const tournament = await Tournament.findOne({
      matches: match._id
    });

    const tournament_info = {
      name: tournament.name,
      tournamentImagUrl: tournament.tournamentImgUrl
    };

    const response = [];

    response.push(match);
    response.push(tournament_info);

    res.status(200).json({
      response
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
        status: "fail",
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

    const newMatch = await Match.create(queryStr);

    // ADD MATCH TO TOURNAMENT AND UPDATE TOURNAMENT IMG IF HAVE
    // Checking tournament exist and create new one if not
    let newTournament = null;
    if (!(await checkTournamentExist(req.body.tournament))) {
      // Create new one
      newTournament = await createNewTournament(
        req.body.tournament,
        tournamentImgUrl,
        newMatch
      );
    } else {
      // Retrieve and update
      newTournament = await updateTournament(
        req.body.tournament,
        tournamentImgUrl,
        newMatch
      );
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
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findOne({
      _id: req.params.id
    });

    if (match) {
      var updated_match = await Match.findByIdAndUpdate(
        req.params.id,
        req.body, {
          new: true,
          runValidators: true
        }
      );
    } else {
      return res.status(404).json({
        status: "fail",
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

      // REMOVE MATCH FROM TOURNAMENT
      const touranment = await Tournament.findOne({
        matches: req.params.id
      });

      const updateTouranment = await Tournament.update({
        _id: touranment._id
      }, {
        $pull: {
          matches: req.params.id
        }
      });

      // REMOVE IMG FROM SERVER
      if (match.fc1ImgUrl != "") {
        removeImg(match.fc1ImgUrl);
      }

      if (match.fc2ImgUrl != "") {
        removeImg(match.fc2ImgUrl);
      }
    } else {
      return res.status(404).json({
        status: "fail",
        message: "Match ID does't exist"
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};