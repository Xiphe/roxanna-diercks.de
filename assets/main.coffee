---
---

replaceText = (node, text, done) ->
    if node.innerText == text
        done()

    else if node.innerText.length == 0 || new RegExp("^#{node.innerText}").test(text)
        step = ->
            node.innerText = text.substring(0, node.innerText.length + 1)
            replaceText node, text, done

        setTimeout step, 120

    else if node.innerText.length
        step = ->
            node.innerText = node.innerText.substring(0, node.innerText.length - 1)
            replaceText node, text, done

        setTimeout step, 70
    

document.querySelectorAll('.banner').forEach (node) ->
    banner = node.querySelector '.banner_inner'
    i = 1
    replace = JSON.parse(decodeURI(banner.dataset.replace))

    replaced = node.querySelector '.banner_replacing'
    blinker = node.querySelector '.banner_blinker'

    step = ->
        blinker.classList.add('active')
        step2 = ->
            replaceText replaced, replace[i], ->
                blinker.classList.remove('active')
                i = if replace[i + 1] then i + 1 else 0
                setTimeout step, 2000       
        setTimeout step2, 500

    setTimeout step, 1500       

    # headline.inner
    
    # console.log(blinker)
    