from langchain_community.document_loaders import CSVLoader
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")


class Backend:

    def __init__(self):
        self.documents = CSVLoader("./BankFAQs.csv", encoding="utf-8").load()
        self.db = Chroma.from_documents(self.documents, embedding_function)

    def getSearchResults(self, query):
        docs = self.db.similarity_search(query)
        #return docs[0].page_content
        return (docs[0].page_content.split('\n'))[1]
