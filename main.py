from typing import Union

from fastapi import FastAPI, Request

from backend.backend import Backend
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

backend = Backend()

class Search(BaseModel):
    search_query: str

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/index", response_class=HTMLResponse)
def render(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")


@app.post("/search/")
def search(query: Search):
    if query is None or query.search_query is None or query.search_query == "" :
        return "Please add a search string"
    print('Inside search')
    return backend.getSearchResults(query.search_query)
