// Stand-in for @mantine/notifications.
//
// @datavant/dart's DatavantProvider renders <Notifications /> from the real
// package, which calls .map() on an uninitialized store and crashes with:
//   TypeError: Cannot read properties of undefined (reading 'map')
// Aliased in vite.config.ts so DatavantProvider (and all Dart components)
// can render normally. All exports are no-ops.

export const Notifications = (): null => null;

export const notifications = {
    show: (): void => {},
    hide: (): void => {},
    update: (): void => {},
    clean: (): void => {},
    cleanQueue: (): void => {},
};
