export function run(): void {
    const calendar = CalendarApp.getDefaultCalendar();
    const nightTimeFrom = 21;
    const nightTimeTo = 8;

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 7 * 24 * 60 * 60 * 1000);
    Logger.log(`Retriving all events from ${startTime.toISOString()} to ${endTime.toISOString()}`);

    const eventList = calendar
        .getEvents(startTime, endTime)
        .filter(
            (event) =>
                nightTimeTo > event.getStartTime().getHours() ||
                event.getStartTime().getHours() > nightTimeFrom
        );
    Logger.log(`Found ${eventList.length} events to process.`);

    eventList.forEach((event) => {
        muteEvent(event, Logger, CalendarApp.GuestStatus.NO);
    });
}

export function muteEvent(
    event: GoogleAppsScript.Calendar.CalendarEvent,
    Logger: GoogleAppsScript.Base.Logger,
    guestStatusNo: GoogleAppsScript.Calendar.GuestStatus
): void {
    Logger.log(`Processing "${event.getTitle()}" (id=${event.getId()})`);

    if (isMyEvent(event)) {
        Logger.log(`Skip processing "${event.getTitle()}" because it's owned by me.`);

        return;
    }

    if (!event.isAllDayEvent() && event.getMyStatus() !== guestStatusNo) {
        event.setMyStatus(guestStatusNo);
        Logger.log(`Set status of the event ${event.getId()} to "NO"`);
    }
    event.removeAllReminders();
    Logger.log(`Removed all reminders for ${event.getId()}`);
}

function isMyEvent(event: GoogleAppsScript.Calendar.CalendarEvent) {
    // event.isOwnedByMe() returns false if the event is Out Of Office.
    // Double check with the event.getMyStatus() for that case.
    return event.isOwnedByMe() || event.getMyStatus() == CalendarApp.GuestStatus.OWNER;
}
