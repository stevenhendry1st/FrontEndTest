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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'

function AllPost() {
  const [articles, setArticles] = useState([])
  const [activeKey, setActiveKey] = useState(1)
  const [totalData, setTotalData] = useState({
    publish: 0,
    draft: 0,
    trash: 0,
  })

  const getAllArticle = async () => {
    await fetch('http://127.0.0.1:8000/articles/5/0')
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.data)
      })
  }

  useEffect(() => {
    setTotalData({
      publish: articles.filter((article) => article.status === 'Publish').length,
      draft: articles.filter((article) => article.status === 'Draft').length,
      trash: articles.filter((article) => article.status === 'Thrash').length,
    })
  }, [articles])

  useEffect(() => {
    getAllArticle()
  }, [])

  const moveToTrash = async (id) => {
    await fetch('http://127.0.0.1:8000/article/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => getAllArticle())
  }

  return (
    <CContainer>
      <CCard>
        <CCardBody>
          <h3 className="mb-3">All Article</h3>

          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Published ({totalData.publish})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Drafts ({totalData.draft})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Thrash ({totalData.trash})
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {articles.length > 0 &&
                    articles
                      .filter((article) => article.status === 'Publish')
                      .map((article, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{article.id}</CTableHeaderCell>
                          <CTableDataCell>{article.title}</CTableDataCell>
                          <CTableDataCell>{article.category}</CTableDataCell>
                          <CTableDataCell>
                            <a className="mx-1 btn btn-primary" href={'#/post/edit/' + article.id}>
                              <i className="fa fa-pencil"></i>
                            </a>
                            <CButton
                              color="danger"
                              className="mx-1"
                              onClick={(e) => moveToTrash(article.id)}
                            >
                              <i className="fa fa-trash text-white"></i>
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {articles.length > 0 &&
                    articles
                      .filter((article) => article.status === 'Draft')
                      .map((article, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{article.id}</CTableHeaderCell>
                          <CTableDataCell>{article.title}</CTableDataCell>
                          <CTableDataCell>{article.category}</CTableDataCell>
                          <CTableDataCell>
                            <a className="mx-1 btn btn-primary" href={'#/post/edit/' + article.id}>
                              <i className="fa fa-pencil"></i>
                            </a>
                            <CButton
                              color="danger"
                              className="mx-1"
                              onClick={(e) => moveToTrash(article.id)}
                            >
                              <i className="fa fa-trash text-white"></i>
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {articles.length > 0 &&
                    articles
                      .filter((article) => article.status === 'Thrash')
                      .map((article, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{article.id}</CTableHeaderCell>
                          <CTableDataCell>{article.title}</CTableDataCell>
                          <CTableDataCell>{article.category}</CTableDataCell>
                          <CTableDataCell>
                            <a className="mx-1 btn btn-primary" href={'#/post/edit/' + article.id}>
                              <i className="fa fa-pencil"></i>
                            </a>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                </CTableBody>
              </CTable>
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default AllPost
