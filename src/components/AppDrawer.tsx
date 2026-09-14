import type { ComponentProps } from 'react';
import { Drawer as MantineDrawer } from '@mantine/core';

// Same CSS-module class-hash collision as AppModal.tsx (see that file for
// details) can affect Drawer's `.mantine-Drawer-inner` positioning too.
// Force it back to a full-viewport-relative fixed wrapper via inline styles.
type DrawerProps = ComponentProps<typeof MantineDrawer>;

export const Drawer = (props: DrawerProps): JSX.Element => (
    <MantineDrawer
        {...props}
        styles={{
            inner: { top: 0, bottom: 0, left: 'auto', right: 0 },
            ...props.styles,
        }}
    />
);
