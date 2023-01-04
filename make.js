const port = 3000; // could be imported from another file instead

function header(title, description) {
    var header = {};
    header.title = title;
    header.description = description;
    header.links = [];

    return header;
}

function link(href, rel, type, title) {
    var item = {};
    item.href = href;
    item.rel = rel;
    item.type = type;
    item.title = title;

    return item;
}

const serviceTitle = "OGC API Features";
const serviceDescription = "Implementation of the OGC API Features suite of standards with Node and Express.";
const serviceUrl = `http://localhost:${port}/`;

// Landing page

function landingPageJSON() {
    var json = header(serviceTitle, serviceDescription);
    
    json.links.push(link(serviceUrl,                 "self",         "application/json", "This document as JSON"));
    json.links.push(link(serviceUrl + "openapi",         "service-desc", "application/vnd.oai.openapi+json;version=3.0", "The OpenAPI definition as JSON"));
    json.links.push(link(serviceUrl + "conformance", "conformance",  "application/json", "OGC API conformance classes implemented by this server"));
    json.links.push(link(serviceUrl + "collections", "data",         "application/json", "Information about the feature collections"));
    
    return json;
}

function landingPage(t) {
    return landingPageJSON();
}

// Collections

function collectionsJSON(collections) {
    var json = {}

    json.links = []
    json.links.push(link(serviceUrl + "collections", "self", "application/json", "Metadata about the feature collections"));
    
    json.collections = [];

    collections.forEach(collection => {
       var item = header(collection, collection);
       item.links.push(link(serviceUrl + "collections/" + collection + "/items", "item", "application/json", collection));
       json.collections.push(item);
    });

console.log(json);

    return json;
}

function collections(collections) {
    return collectionsJSON(collections);
}

module.exports = {landingPage, collections}
