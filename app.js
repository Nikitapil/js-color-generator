const cols = document.querySelectorAll('.col')

function copyToClipBoard(text) {
    return navigator.clipboard.writeText(text)
}

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code === 'Space') {
        setRandomColors()
    }
})

document.addEventListener('click', (e) => {
    const { type } = e.target.dataset
    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0]
        console.log('123')
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
        showCopiedNotification(e.target, 'Locked!')
    }
    if (type === 'copy') {
        copyToClipBoard(e.target.textContent)
        showCopiedNotification(e.target, 'Copied!')
    }
})

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, idx) => {
        const text = col.querySelector('h2')
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const button = col.querySelector('button')
        // using chroma.js library
        const color = isInitial && colors[idx] ? colors[idx] : chroma.random()

        if (colors.length !== cols.length) {
            colors.push(color)
        }

        col.style.background = color
        text.textContent = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash (colors = []) {
    document.location.hash = colors.map(color => color.toString().substring(1)).join('-')
}

function getColorsFromHash() {
    if(document.location.hash.length > 1) {
       return document.location.hash.slice(1).split('-').map(color => '#' + color)
    }
    return []
}

function showCopiedNotification(node, text) {
    const notification = document.createElement('p')
    notification.className = 'notification'
    notification.textContent = text
    notification.style.top = (node.getBoundingClientRect().top - 35) + 'px'
    node.insertAdjacentElement('beforebegin', notification)
    setTimeout(() => {
        notification.remove()
    }, 1800)
}
setRandomColors(true)
