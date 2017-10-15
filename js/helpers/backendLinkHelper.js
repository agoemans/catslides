var BackendLinkHelper = function(){
    function create(linkArray){
        var linkList = [];
        for (var i = 0; i < linkArray.length; i++){
            linkList.push(new BackEndLink(linkArray[i]), i);
        }

        return linkList;
    }
    return {
        getLinks: function(obj){
            if(!obj.interactive.clickable){
                return null;
            } else {
                return create(obj.interactive.links)
            }
        }
    }
};
