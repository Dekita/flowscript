/*
########################################
# PalHUB::Client by dekitarpg@gmail.com
########################################
*/

export default function SmallStrong({ className, text }) {
    return (
        <small className={className}>
            <strong>{text}</strong>
        </small>
    );
}
