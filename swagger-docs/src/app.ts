import express from 'express'
import swaggerUi from 'swagger-ui-express'
import * as Document_menu from './swagger/menu.json'
import * as Document_auth from './swagger/auth.json'
import * as Document_courses from './swagger/courses.json'
import * as Document_lessons from './swagger/lessons.json'
import * as Document_playtec from './swagger/coursePlaytec.json'
import * as Document_questions from './swagger/questions.json'
import * as Document_calendary from './swagger/calendary.json'
import * as Document_post from './swagger/post.json'
import * as bodyParser from 'body-parser'

class App {
  private httpServer: any

  constructor() {
    this.httpServer = express()

    this.httpServer.use(bodyParser.urlencoded({ extended: true }));
    this.httpServer.use(bodyParser.json());

    // Definiendo rutas de navegaciòn
    this.httpServer.use("/menu", swaggerUi.serve, (...args) => swaggerUi.setup(Document_menu)(...args));
    this.httpServer.use("/auth", swaggerUi.serve, (...args) => swaggerUi.setup(Document_auth)(...args));
    this.httpServer.use("/courses", swaggerUi.serve, (...args) => swaggerUi.setup(Document_courses)(...args));
    this.httpServer.use("/lessons", swaggerUi.serve, (...args) => swaggerUi.setup(Document_lessons)(...args));
    this.httpServer.use("/coursePlaytec", swaggerUi.serve, (...args) => swaggerUi.setup(Document_playtec)(...args));
    this.httpServer.use("/questions", swaggerUi.serve, (...args) => swaggerUi.setup(Document_questions)(...args));
    this.httpServer.use("/calendary", swaggerUi.serve, (...args) => swaggerUi.setup(Document_calendary)(...args));
    this.httpServer.use("/post", swaggerUi.serve, (...args) => swaggerUi.setup(Document_post)(...args));
  }

  public Start = (port: number) => {
    return new Promise((resolve, reject) => {

      this.httpServer.listen(
        port,
        () => {
          resolve(port)
        })
        .on('error', (err: object) => reject(err));
    })
  }
}

export default App;


