"use strict";

const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

/**
 *
 * @name moleculer-audit-log
 * @module Service
 */
module.exports = {
    metrics: {
        enabled: true
	},
	name: "sentry-moleculer",

	/**
	 * Default settings
	 */
	settings: {

	},

	/**
	 * Events
	 */
	events: {
	},
	hooks: {
		after: {
		  '*': function (ctx, res) {
			return {success: true, data: res}
		  }
		 },
		error: {
		  '*': function (ctx, err) {
			Sentry.captureException(err);
			this.logger.error(err.message)
			return {success: false, error: err.message}
		  }
		},
	},

	/**
	 * Methods
	 */
	methods: {
	},
	started() {
        console.log('Started requests for sentry');
	},
	stopped() {
        console.log('Stopped requests for sentry');
	},
	created() {
		Sentry.init({
			dsn: this.settings.dsn,
			environment: this.settings.environment,
			tracesSampleRate: 1.0
		});
	}
};
