const client = require('redis').createClient();

module.exports = {

	set: function(hash, key, value) {
		return new Promise((resolve, reject) => {
			client.hset(hash, key, value, (err) => {
				if(err)
					reject(err);
				else
					resolve({ [key]: value });
			});
		});
	},

	get: function(hash, key) {
		return new Promise((resolve, reject) => {
			client.hget(hash, key, (err, value) => {
				if(err) 
					reject(err);
				else 
					resolve({ [key]: value });
			});
		});
	},

	getAll: function(hash) {
		return new Promise((resolve, reject) => {
			client.hgetall(hash, (err, obj) => {
				if(err)
					reject(err);
				else
					resolve(obj);
			})
		});
	},

	incr: function(hash, key) {
		return new Promise((resolve, reject) => {
			client.hincrby(hash, key, 1, (err, count) => {
				if(err) 
					reject(err);
				else 
					resolve({ [key]: count });
			});
		});
	}
}
