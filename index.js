'use strict';

import {Monitor, ThresholdAlertTrigger} from 'beanstalkd-monitor';

const host = process.argv[2] || '127.0.0.1';
const port = process.argv[3] || 11300;

// Port should be >= 0 and < 65536.
const monitor = new Monitor(host, port);

monitor.on('update', function (data) {
    console.log('update', data);
});

monitor.on('alert', function (alert) {
    console.log('alert', alert);
});

// Will trigger an alert if amount of jobs in ready state for tube exceeds 500
monitor.addAlertTrigger('max', new ThresholdAlertTrigger('ready', 1));

monitor.start();
