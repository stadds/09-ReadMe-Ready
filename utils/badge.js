function getBadges(user,repo,badgeArr){

    let badgeStr = "";
    
    // badges key and markdown
    const badges = {
       "git-follow": `![GitHub followers](https://img.shields.io/github/followers/${user}?style=social)`,
        "git-watchers": `![GitHub watchers](https://img.shields.io/github/watchers/${user}/${repo}?style=social)`,
       "git-starred":`![GitHub stars](https://img.shields.io/github/stars/${user}/${repo}?style=social)`,
       "git-reposize": `![GitHub repo size](https://img.shields.io/github/repo-size/${user}/${repo})`,
        "git-openissues":`![GitHub issues](https://img.shields.io/github/issues-raw/${user}/${repo})`
    }

    
    //compare the chosen badges to the badge object, make a string of markdown badges
    for(let i = 0; i < badgeArr.length; i++){

        let badgeIdx = badgeArr[i];

        if(badgeArr[i] in badges){
            badgeStr += badges[badgeIdx] + "\t";
        }
    }

    return badgeStr;
}

module.exports = { 
       getBadges: getBadges, 
}