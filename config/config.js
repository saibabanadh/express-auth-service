module.exports = {
	APP : "Authentication App",
	API_BASE: "/api/v1",
	JWT_SECRET: 'JWT_SECRET_FOR_WEB_TOKENS',
	JWT_EXPIRES_IN: 60,
	PORT: "8080",
	MONGO : {
		"hostname":"localhost",
		"port":"27017",
		"username":"appuser",
		"password":"App123",
		"dbName": "auth_db"
	},
	LogFilePath: "logs/",
	LogStreamFilePath:"logs/streamlogs/"
}

