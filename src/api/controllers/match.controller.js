const Match = require("./../models/match.model");
const Streaming = require("./../models/streaming.model");
const Tournament = require("./../models/tournament.model");
const SportType = require("./../models/sportType.model");
const APIFeature = require("./../utils/apiFeatures");
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

function saveImg(file, string) {
  let imgUrl = "/uploads/representative.jpg";
  if (file) {
    const filename =
      file.name
      .split(".")
      .slice(0, -1)
      .join(".") +
      "-" +
      Date.now() + string;

    const extname = file.name.split(".").slice(-1)[0];
    const img = filename + "." + extname;

    file.mv(path.join(__dirname, "../../uploads/" + img));

    imgUrl = "/uploads/" + img;
  }

  return imgUrl;
};

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
  if (imgUrl == 'representative.jpg') {
    return;
  }

  const img_path = path.join(__dirname, "../../uploads/" + imgUrl);

  if (fs.existsSync(img_path)) {
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
        .populate("streaming", "-_id")
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

    // GET TOURNAMENT FOR MATCH
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
    let fc1ImgUrl = "/uploads/representative.jpg";
    let fc2ImgUrl = "/uploads/representative.jpg";
    let tournamentImgUrl = "/uploads/representative.jpg";
    if (req.files) {
      validateImg(req.files, message);

      if (message.length == 0) {
        fc1ImgUrl = saveImg(req.files.fc1Img, "fc1");
        fc2ImgUrl = saveImg(req.files.fc2Img, "fc2");
        tournamentImgUrl = saveImg(req.files.tournamentImg, "");
      }
    }

    if (message.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: message
      });
    }


    // CREATE STREAMING FOR NEW MATCH
    const queryStreaming = {
      ...req.body
    }

    let streamingUrl = [];

    let streamingUrlFake = [];

    streamingUrl = req.body.streamingUrl.split(",");
    queryStreaming['streamingUrl'] = streamingUrl;

    // Create streaming url fake
    let fc1 = "team1";
    let fc2 = "team2"
    if (req.body.fc1) {
      fc1 = req.body.fc1;
    }

    if (req.body.fc2) {
      fc2 = req.body.fc2;
    }

    for (var i = 0; i < streamingUrl.length; i++) {
      const urlFake = fc1 + '-vs-' + fc2 + "-" + Date.now() + i;
      streamingUrlFake.push(urlFake);
    }

    queryStreaming['streamingUrlFake'] = streamingUrlFake;

    const newStreaming = await Streaming.create(queryStreaming);
    const streaming_id = newStreaming._id;


    // CREATE NEW MATCH
    let queryStr = {
      ...req.body
    };

    queryStr["streaming"] = streaming_id;
    queryStr["fc1ImgUrl"] = fc1ImgUrl;
    queryStr["fc2ImgUrl"] = fc2ImgUrl;
    
    queryStr['_id'] = fc1.replace(/\s/g, '-').toLowerCase() + '-vs-' + fc2.replace(/\s/g, '-').toLowerCase() + '-' + new Date().getTime().toString().slice(10);
    

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
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    // Array store response in order to send to client
    let response = {};

    const match = await Match.findOne({
      _id: req.params.id
    });

    if (match) {

      // IF TOURNAMENT WAS SUBMITTED
      if (req.body.tournament) {
        var tournamentImgUrl = '';

        // Check submitted tournament exists
        var tournament = await Tournament.findOne({
          name: req.body.tournament
        });

        // create new tournament if doesn't exist
        if (!tournament) {
          tournament = await Tournament.create({
            name: req.body.tournament
          });
        }

        // Remove match from old tournament
        const oldTournament = await Tournament.findOne({
          matches: req.params.id
        });
        await Tournament.update({
          _id: oldTournament._id
        }, {
          $pull: {
            matches: req.params.id
          }
        });

        // update tournament img if change
        if (req.files) {
          if (req.files.tournamentImg) {
            const tournamentImg_submitted = '/uploads/' + req.files.tournamentImg.name;
            if (oldTournament.tournamentImgUrl.split('/').slice(-1)[0] != tournamentImg_submitted) {
              removeImg(tournament.tournamentImgUrl.split("/").slice(-1)[0]);
              tournamentImgUrl = saveImg(req.files.tournamentImg, "");
            } else {
              tournamentImgUrl = '/uploads/' + req.files.tournamentImg.name;
            }
          }
        }

        if (tournamentImgUrl == '') {
          tournamentImgUrl = "/uploads/representative.jpg";
        }

        // Add match to submitted tournament
        const newTournament = await Tournament.findByIdAndUpdate({
          _id: tournament._id
        }, {
          $addToSet: {
            matches: req.params.id
          },
          tournamentImgUrl: tournamentImgUrl
        }, {
          new: true,
          runValidators: true
        });

        response["tournament"] = newTournament;
      }

      // HANDLE FOR UPDATE MATCH
      let queryMatch = {
        ...req.body
      }

      // Add type to queryMatch if was submitted
      if (req.body.type) {
        const sportType = await SportType.findOne({
          name: req.body.type
        });

        if (sportType) {
          queryMatch['type'] = sportType._id;

        } else {
          return res.status(404).json({
            status: 'fail',
            message: "Doesn't have sport type submitted in database"
          });
        }
      }

      if (req.files) {
        if (req.files.fc1Img) {
          const fc1Img_submitted = '/uploads/' + req.files.fc1Img.name;
          if (match.fc1ImgUrl.split('/').slice(-1)[0] != fc1Img_submitted) {
            removeImg(match.fc1ImgUrl.split("/").slice(-1)[0]);
            const fc1ImgUrl = saveImg(req.files.fc1Img, "fc1");
            queryMatch['fc1ImgUrl'] = fc1ImgUrl;
          }
        }

        if (req.files.fc2Img) {
          const fc2Img_submitted = '/uploads/' + req.files.fc2Img.name;
          if (match.fc2ImgUrl.split('/').slice(-1)[0] != fc2Img_submitted) {
            removeImg(match.fc2ImgUrl.split("/").slice(-1)[0]);
            const fc2ImgUrl = saveImg(req.files.fc2Img, "fc2");
            queryMatch['fc2ImgUrl'] = fc2ImgUrl;
          }
        }
      }

      var updated_match = await Match.findByIdAndUpdate(
        req.params.id,
        queryMatch, {
          new: true,
          runValidators: true
        }
      );

      response["match"] = updated_match;

      // UPDATE FOR STREAMING
      const queryStreaming = {
        ...req.body
      };

      if (req.body.streamingUrl) {
        let streamingUrl = [];
        let streamingUrlFake = [];

        streamingUrl = req.body.streamingUrl.split(",");
        queryStreaming['streamingUrl'] = streamingUrl;

        // Create streaming url fake
        let fc1 = "team1";
        let fc2 = "team2"
        if (req.body.fc1) {
          fc1 = req.body.fc1;
        }

        if (req.body.fc2) {
          fc2 = req.body.fc2;
        }

        for (var i = 0; i < streamingUrl.length; i++) {
          const urlFake = fc1 + '-vs-' + fc2 + "-" + Date.now() + i;
          streamingUrlFake.push(urlFake);
        }

        queryStreaming['streamingUrlFake'] = streamingUrlFake;
      }

      var updated_streaming = await Streaming.findByIdAndUpdate(
        match.streaming,
        queryStreaming, {
          new: true,
          runValidators: true
        }
      );

      response["streaming"] = updated_streaming;

    } else {
      return res.status(404).json({
        status: "fail",
        message: "Match ID does't exist"
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        response
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
        removeImg(match.fc1ImgUrl.split('/').slice(-1)[0]);
      }

      if (match.fc2ImgUrl != "") {
        removeImg(match.fc2ImgUrl.split("/").slice(-1)[0]);
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