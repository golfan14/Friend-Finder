var path = require("path");

var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body);


        var newFriend = req.body;
        // get new friend scores
        // loop over every friend and accumulate an array of differences
        //      scores from friend
        //      loop over every score and accumulate total difference
        //              calculate diff between the two
        //              take the absolute value of the diff
        //              add value to total difference
        //      store total difference in the array of differences
        // find the index of the lowest value in the array of differences
        // insert logic here
        // return the friend object that sits at that index in the friends array

        var newScores = newFriend.scores.map(parseInt);
        var scoreDifferences = [];
        for (var i = 0; i < friends.length; i++) {
            var friendScores = friends[i].scores;
            var totalDifference = 0;
            for (var j = 0; j < friendScores.length; j++) {
                totalDifference += Math.abs(newScores[j] - friendScores[j]);
            }
            scoreDifferences.push(totalDifference);
        }
        console.log(scoreDifferences);

        var bestMatchIndex = 0
        scoreDifferences.reduce(function (acc, score, index) {
            if (index === 0) {
                bestMatchIndex = index;
                return acc = score;
            }
            if (acc > score) {
                bestMatchIndex = index;
                return acc = score;
            }
        }, 0)

        var bestFriend = friends[bestMatchIndex];

        res.status(200).json(bestFriend);
    });
};