import log from './log-service.js';

export function run() {
    log.error('Error!');
    log.warn('Warning!');
    log('Message!');
    log.info('Info!');
    log.debug('Debug!');
    log.silly('Silly!');
}