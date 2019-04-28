function getPlacementForPopover(position) {
    if (position === `top-left`) {
        return `bottom-start`;
    } if (position === `top-right`) {
        return `bottom-end`;
    } if (position === `bottom-left`) {
        return `top-start`;
    } if (position === `bottom-right`) {
        return `top-end`;
    } if (position === `left-top`) {
        return `right-start`;
    } if (position === `left-bottom`) {
        return `right-end`;
    } if (position === `right-top`) {
        return `left-start`;
    } if (position === `right-bottom`) {
        return `left-end`;
    }
}

function getPlacementForTooltip(position) {
    const arr = (position || ``).split(`-`);
    if (arr[0] === `top`) {
        return `bottom`;
    } if (arr[0] === `bottom`) {
        return `top`;
    } if (arr[0] === `left`) {
        return `right`;
    } if (arr[0] === `right`) {
        return `left`;
    }
}

export default {
    getPlacementForPopover,
    getPlacementForTooltip
};
