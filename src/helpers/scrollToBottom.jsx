import { animateScroll } from "react-scroll";

export const scrollToBottomm = (id) => {
    setTimeout(() => {
        animateScroll.scrollToBottom({
            containerId: id,
            duration: 0
        });
    })

}

export const scrollToBottomAnimated = (id) => {
    setTimeout(() => {
        animateScroll.scrollToBottom({
            containerId: id,
            duration: 250
        });
    })
}