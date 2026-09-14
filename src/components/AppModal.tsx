import type { ComponentProps } from 'react';
import { Modal as DartModal } from '@datavant/dart';

// Wraps @datavant/dart's Modal to fix a CSS-module class-hash collision between
// dart's bundled Mantine styles and this app's own @mantine/core styles: the
// `.mantine-Modal-inner` positioning wrapper picks up a stray `left` offset
// (equal to the sidebar + content-column width) from the wrong stylesheet,
// pushing centered modals off-screen. Forcing `left`/`right` back to 0 via
// inline styles (which always beat class-based CSS) restores true centering.
type DartModalProps = ComponentProps<typeof DartModal>;

export const Modal = (props: DartModalProps): JSX.Element => (
    <DartModal
        {...props}
        styles={{
            inner: { left: 0, right: 0 },
            ...props.styles,
        }}
    />
);
