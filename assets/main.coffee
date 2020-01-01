---
---

RESTART = Symbol('RESTART')

replaceText = (node, text, done) ->
    if node.innerText == text
        done()

    else if node.innerText.length == 0 || new RegExp("^#{node.innerText}").test(text)
        step = ->
            t = text.substring(0, node.innerText.length + 1)

            while t.match(/\s$/)
                t = text.substring(0, t.length + 1)
            
            node.innerText = t

            replaceText node, text, done

        setTimeout step, 120

    else if node.innerText.length
        step = ->
            node.innerText = node.innerText.substring(0, node.innerText.length - 1)
            replaceText node, text, done

        setTimeout step, 70
    

createReplacer = (replaced, replace, blinker) ->
    unless replaced
        return () -> Promise.resolve()

    i = 1
    replace = replace.sort () => 0.5 - Math.random()

    () -> new Promise((resolve) -> 
        if i == 0
            replace = replace.sort () => 0.5 - Math.random()
        blinker.classList.add('active')
        replaceText replaced, replace[i], ->
            blinker.classList.remove('active')
            i = if replace[i + 1] then i + 1 else 0
            resolve()
    )

queue = (steps...) ->
    () ->
        step = (i) ->
            if steps[i] == RESTART
                step 0
            else if steps[i]
                steps[i]().then (result) ->
                    step if result == RESTART then 0 else i + 1
        step 0

timeout = (ms) -> () -> new Promise((resolve) -> setTimeout(resolve, ms))

document.querySelectorAll('.banner').forEach (node) ->
    banner = node.querySelector '.banner_inner'
    i = 1

    replacer = createReplacer(
        node.querySelector('.banner_replacing'),
        JSON.parse(decodeURI(banner.dataset.replace)),
        node.querySelector('.banner_blinker')
    )

    replacer2 = createReplacer(
        node.querySelector('.banner_replacing2'),
        JSON.parse(decodeURI(banner.dataset.replace2)),
        node.querySelector('.banner_blinker2')
    )

    setTimeout(
        queue(
            replacer,
            timeout(500),
            replacer2,
            timeout(5000),
            RESTART
        ),
        1500
    )

    # headline.inner
    
    # console.log(blinker)
    