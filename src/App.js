import {Formik, Form,Field} from 'formik'
import { useState } from 'react'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const initialValues={
    search: '',

  }
  const [photos,setPhotos]=useState([])
  const open = (url) => window.open(url)
  return (
    <div>
      <header>
        <Formik
          initialValues={initialValues}
          onSubmit={async values => {
            const response = await 
              fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
                {
                  headers: {
                    'Authorization': 'Client-ID Xt7w_CPj5zX9Q7-P6hMK8lt9Tji-ck5fR1sBPmI7vfI'
                  }
                }
              )
            const data = await response.json()
            setPhotos(data.results)
            //llamar a api de unsplash

          }}
        >
          <Form>
            <Field name='search'/>
          </Form>

        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img alt ={photo.alt_description} src={photo.urls.regular}/>
              <p>{[photo.description,photo.alt_description].join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
