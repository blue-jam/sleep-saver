import { muteEvent } from '.';

const Logger = {
    log: jest.fn(),
};

enum GuestStatus {
    NO,
}

describe('App', () => {
    it('mute calendar event', () => {
        const event = {
            getTitle: () => 'event title',
            getId: () => 'eventId',
            isAllDayEvent: () => false,
            setMyStatus: jest.fn(),
            removeAllReminders: jest.fn(),
        };

        // @ts-ignore
        muteEvent(event, Logger, GuestStatus.NO);

        expect(event.setMyStatus).toHaveBeenCalledWith(GuestStatus.NO);
        expect(event.removeAllReminders).toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalled();
    });

    it('mute all day event', () => {
        const event = {
            getTitle: () => 'event title',
            getId: () => 'eventId',
            isAllDayEvent: () => true,
            setMyStatus: jest.fn(),
            removeAllReminders: jest.fn(),
        };

        // @ts-ignore
        muteEvent(event, Logger, GuestStatus.NO);

        expect(event.setMyStatus).not.toHaveBeenCalled();
        expect(event.removeAllReminders).toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalled();
    });
});
