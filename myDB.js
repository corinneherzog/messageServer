class myDB



    constructor(name) {
        this.dbs = {
            "chat": {
                "collections" : ["messages", "userMessages"],
                "url" : "mongodb://localhost:27017"
            }
        }
        this.connections = {};
        MongoClient.connect(this.dbs[name].url, function(err, db).bind()) {
                this.dbs[name].connection = db;
            });        
    }

    insertDoc (connection, data, callback) {
        
    }