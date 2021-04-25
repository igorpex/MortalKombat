//random number generator
export const getRandom = (base) => {
    return Math.ceil(Math.random() * base);
}

//creates DOM element based on tag and class name
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}