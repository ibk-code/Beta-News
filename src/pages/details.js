import React from "react";
import Seo from "../components/Seo";
import Navigation from "../components/Navigation/";
import { Container } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import firebase from "../firebase";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: "",
      newComment: "",
      comments: [],
    };
  }

  imgError = (e) => {
    e.target.src = "./asset/img/dummy.jpg";
  };

  getArticle = () => {
    const title = new URLSearchParams(window.location.search).get("title");
    this.props.feed.getSingleFeed(title);
  };

  getComments = () => {
    this.setState({ loadingComments: true });
    const articles = firebase.db.collection("articles");
    const title = new URLSearchParams(window.location.search).get("title");
    articles
      .where("title", "==", title)
      .get()
      .then((querySnapShot) => {
        if (querySnapShot.docs.length === 0) {
          articles
            .add({
              title,
              comments: [],
              createdAt: Date.now(),
            })
            .then((doc) => {
              this.setState({
                articleId: doc.id,
              });
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        } else {
          this.setState({
            articleId: querySnapShot.docs[0].id,
            comments: querySnapShot.docs[0].data().comments,
          });
        }
      });
    this.setState({ loadingComments: false });
  };

  submitComment = (e) => {
    e.preventDefault();
    this.updateComment();
  };

  updateComment = () => {
    const articles = firebase.db.collection("articles");
    if (this.state.newComment !== ("" || " ")) {
      const comment = {
        comment: this.state.newComment,
        posted: Date.now(),
      };
      articles
        .doc(this.state.articleId)
        .update({
          comments: [...this.state.comments, comment],
        })
        .then((doc) => {
          const prevState = this.state.comments;
          this.setState({ comments: [comment, ...prevState], newComment: "" });
        });
    }
  };

  componentDidMount() {
    this.getArticle();
    this.getComments();
  }

  render() {
    const article = this.props.feed?.singleFeed;
    return (
      <React.Fragment>
        <Seo page="Articles">
          <header>
            <Navigation />
          </header>
          <main id="main">
            <Container>
              <div className="details">
                {
                  <div>
                    <h1>{`Article: ${article?.title}`}</h1>
                    <img
                      src={article?.urlToImage || "./asset/img/dummy.jpg"}
                      onError={this.imgError}
                      alt={article?.title}
                      className="img-fluid"
                    />
                    <article>
                      <div className="article-details pt-3">
                        <p className="article-date">
                          <b> Date: </b>
                          {new Date(article?.publishedAt).toDateString()}
                        </p>
                        <p>
                          <b>Author:</b>{" "}
                          {this.props.author === null
                            ? "Not available"
                            : article?.author}
                        </p>
                      </div>
                      <p className="content">{article?.content}</p>
                      <p className="read-more">
                        <b>Read More:</b>{" "}
                        <a
                          href={article?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click here to read more
                        </a>
                      </p>
                    </article>
                    <div className="comment">
                      <h2>Comment:</h2>
                      <form onSubmit={this.submitComment}>
                        <label htmlFor="comment">Leave a comment:</label>
                        <textarea
                          id="comment"
                          value={this.state.newComment}
                          onChange={(e) =>
                            this.setState({ newComment: e.target.value })
                          }
                        ></textarea>
                        <button
                          type="submit"
                          className="am-btn bg-orange solid"
                        >
                          Submit
                        </button>
                      </form>
                      <div className="other-comment">
                        <h3>Other Comments</h3>
                        {this.state.comments.length > 0 ? (
                          this.state.comments.map((e, i) => (
                            <div key={i} className="user-comment">
                              <p className="user">
                                <b>User:</b> Annonymous
                              </p>
                              <p className="user-comments">{e.comment}</p>
                              <p className="date">
                                <b>Posted:</b>{" "}
                                {new Date(e.posted).toDateString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No comment has been made</p>
                        )}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </Container>
          </main>
        </Seo>
      </React.Fragment>
    );
  }
}

export default inject("feed")(observer(Details));
// export default Home;
