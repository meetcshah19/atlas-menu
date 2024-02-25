# Atlas

## Setup Instructions
```bash
npm install
docker-compose up -d
rm -r node_modules/@types/glob/
```
The type conflict is solved by the last command. Why? [Link](https://stackoverflow.com/a/75950982).

Setup db credentials and db name in ormconfig.json

```bash
npm start
```

Use http://localhost:4000/ to access the apollo endpoint
