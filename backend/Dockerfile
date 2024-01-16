FROM python:3.11


WORKDIR /backend

EXPOSE 12345

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . ./

CMD ["flask", "run", "--host=0.0.0.0", "--port=12345"]