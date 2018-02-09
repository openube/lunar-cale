var pObj = {
	"\.(css|less)$": '<rootDir>/__test__/NullModule.js'
};

module.exports = {
	modulePaths: [
		"<rootDir>/src/"
	], 
	modulePathIgnorePatterns: [
		"<rootDir>/lib/"
	],
	moduleNameMapper: pObj,
	collectCoverage: true,
	coverageDirectory: "<rootDir>/src/",
	coveragePathIgnorePatterns: [
		"<rootDir>/lib/",
		"<rootDir>/__test__/"
	],
	coverageReporters: ["text"],
};