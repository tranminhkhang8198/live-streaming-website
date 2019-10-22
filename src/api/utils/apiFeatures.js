const SportType = require("./../models/sportTypeModel");

class APIFeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    async getTypeId(typename) {
        let id = "";
        const sportType = await SportType.findOne({
            name: typename
        });

        if (sportType) {
            id = sportType._id;
        }
        return id;
    }

    filter() {
        const queryObj = {
            ...this.queryString
        }

        const excludedFields = ["page", "sort", "limit", "fields", "type"];
        excludedFields.forEach(el => delete queryObj[el]);

        var queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }


    time() {
        if (this.queryString.time) {
            if (this.queryString.time == "today") {
                var start = new Date();
                start.setUTCHours(0, 0, 0, 0);

                var end = new Date();
                end.setUTCHours(23, 59, 59, 999);

            } else if (this.queryString.time == "tomorrow") {
                var today = new Date();

                var start = new Date(today.getTime() + (24 * 60 * 60 * 1000));
                start.setUTCHours(0, 0, 0, 0);

                var end = new Date(today.getTime() + (24 * 60 * 60 * 1000));
                end.setUTCHours(23, 59, 59, 999);
            } else {
                var start = new Date(this.queryString.time);
                start.setUTCHours(0, 0, 0, 0);

                var end = new Date(this.queryString.time);
                end.setUTCHours(23, 59, 59, 999);
            }

            this.query = this.query.find({
                time: {
                    $gte: start,
                    $lte: end
                }
            });
        }

        return this;
    }

    type() {
        if (this.queryString.type) {
            console.log("sucess");
            this.query = this.query.find({
                type: "5daebdcf20e9a40de1286577"
            });
        }

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("createdAt");
        }

        return this;
    }


    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }


    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
};

module.exports = APIFeature;