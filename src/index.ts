import app from './app'

async function main () {
  app.listen(app.get('port'))
  console.log(`Server on port http://localhost:${app.get('port') as string}`)
}
void main()
