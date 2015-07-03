import log from './log-service.js';

export function run() {
    for (let i = 0; i < 20; i++) {
        log.error(`Error!   Loop #${i}`);
        log.warn(`Warning! Loop #${i}`);
        log(`Message! Loop #${i}`);
        log.info(`Info!    Loop #${i}`);
        log.debug(`Debug!   Loop #${i}`);
        log.silly(`Silly!   Loop #${i}`);
    }
}