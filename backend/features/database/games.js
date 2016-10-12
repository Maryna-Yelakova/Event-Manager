    var db = require("./connection");
    var games = function() {
        this.getGames = function () {
            return db.query("SELECT \"id\", \"date\", \"place\", \"title\", \"desc\"  FROM " +
                "\"events\" WHERE \"isGame\" = true;");
        };
        this.getPlayers = function () {
            return db.query("SELECT \"id\",\"full_name\" FROM \"users\"  WHERE \"id\" in (SELECT DISTINCT \"user\" FROM \"game_result\");");
        };

        this.getByUser = function(id) {
            return db.query("SELECT \"events\".\"title\", \"date\",\"place\", \"wins\", \"loses\"," +
                " \"draws\" FROM \"game_result\" INNER JOIN \"events\"" +
                " ON \"game_result\".\"event\" = \"events\".\"id\"" +
                " WHERE \"user\" = " + id + ";");
        };
        this.getByEvent = function(id) {
            return db.query("SELECT \"users\".\"full_name\", \"wins\", \"loses\"," +
                " \"draws\" FROM \"game_result\" INNER JOIN \"users\"" +
                " ON \"game_result\".\"user\" = \"users\".\"id\"" +
                " WHERE \"event\" = " + id + ";");
        };
        this.addGame = function(game) {
            return db.query("INSERT INTO \"game_result\"(\"user\", \"event\", " +
                "\"wins\", \"loses\", \"draws\") VALUES(" + game.user + ", " +
                game.event + ", " + game.wins + ", " + game.loses + ", " + game.draws +
                ");");
        };
        this.updateGame = function(game) {
            return db.query("UPDATE \"game_result\" SET \"user\" = " + game.user +
                ", \"event\" = " + game.event + ", \"wins\" = " + game.wins +
                ", \"loses\" = " + game.loses + ", \"draws\" = " + game.draws +
                " WHERE \"id\" =  " + game.id + ";");
        };
        this.deleteById = function(id) {
            return db.query("DELETE FROM \"game_result\" WHERE \"id\" = " + id + ";");
        };
        this.deleteByUser = function(user) {
            return db.query("DELETE FROM \"game_result\" WHERE \"user\" = " + user + ";");
        };
        this.deleteByEvent = function(event) {
            return db.query("DELETE FROM \"game_result\" WHERE \"event\" = " + event + ";");
        };
        this.getLastId = function() {
            return db.query("SELECT \"id\" FROM \"game_result\" ORDER BY \"id\" DESC LIMIT 1;");
        };
    };
    module.exports = games;
