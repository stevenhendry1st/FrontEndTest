import {
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import { useState, useEffect } from 'react'
import React from 'react'

function PreviewPost() {
  const [articles, setArticles] = useState([])
  const getAllArticle = async () => {
    await fetch('http://127.0.0.1:8000/articles/5/0')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.data)
      })
  }

  useEffect(() => {
    getAllArticle()
  }, [])

  return (
    <CContainer>
      <CCard>
        <CCardBody>
          <h3 className="mb-3">Preview Post</h3>

          {articles.length > 0 &&
            articles
              .filter((article) => article.status === 'Publish')
              .map((article, index) => (
                <CCard key={index} className="my-2">
                  <CCardBody>
                    <h5>{article?.title}</h5>
                    <p>Category: {article?.category}</p>
                    <p>{article?.content}</p>
                  </CCardBody>
                </CCard>
              ))}
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default PreviewPost
