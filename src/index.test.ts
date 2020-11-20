import { muteEvent } from '.';

const Logger = {
    log: jest.fn(),
};

enum GuestStatus {
    NO, YES
}

describe('App', () => {
    let event;

    beforeEach(() => {
        event = {
            getTitle: () => 'event title',
            getId: () => 'eventId',
            isAllDayEvent: () => false,
            setMyStatus: jest.fn(),
            getMyStatus: () => GuestStatus.YES,
            removeAllReminders: jest.fn(),
            isOwnedByMe: () => false,
        };
    });

    it('mute calendar event', () => {
        // @ts-ignore
        muteEvent(event, Logger, GuestStatus.NO);

        expect(event.setMyStatus).toHaveBeenCalledWith(GuestStatus.NO);
        expect(event.removeAllReminders).toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalled();
    });

    it('mute all day event', () => {
        event.isAllDayEvent = () => true;

        // @ts-ignore
        muteEvent(event, Logger, GuestStatus.NO);

        expect(event.setMyStatus).not.toHaveBeenCalled();
        expect(event.removeAllReminders).toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalled();
    });

    it('do not modify event if it is my event', () => {
        event.isOwnedByMe = () => true;

        // @ts-ignore
        muteEvent(event, Logger, GuestStatus.NO);

        expect(event.setMyStatus).not.toHaveBeenCalled();
        expect(event.removeAllReminders).not.toHaveBeenCalled();
        expect(Logger.log).toHaveBeenCalled();
    });
});
