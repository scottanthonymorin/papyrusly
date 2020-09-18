import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getDate } from "../../../helpers/date";
import { shouldISearch } from "../../../helpers/shouldISearch";
import { textToQuery } from "../../../helpers/textToQuery";
import { getFetch } from "../../../helpers/getFetch";
import { addQuestionQueries } from "../../../actions";
import { useDispatch } from "react-redux";

const Journal = () => {
  const [fetchQuestions, SetFetchQuestions] = React.useState([]);
  const [fetchStatus, SetFetchStatus] = React.useState("idle");
  const [startSearch, SetStartSearch] = React.useState(false);
  const [content, SetContent] = React.useState("");
  const [placeholder, SetPlaceholder] = React.useState(
    "Type your text in here"
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (content.length > 0) {
      SetPlaceholder("");
    } else {
      SetPlaceholder("Type your text in here");
    }
    SetStartSearch(shouldISearch(content));
  }, [content]);

  React.useEffect(() => {
    if (startSearch === false) return;
    const populateCommonQueries = async () => {
      SetFetchStatus("fetching");
      let query = textToQuery(content).replace(" ", "_");
      if (query.length > 0) {
        let response = await fetch(`/api/test/${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let JSONdata = await response.json();
        dispatch(addQuestionQueries(JSONdata));
        // SetFetchQuestions(JSONdata);
        // SetFetchStatus("fetching")
      }
    };
    populateCommonQueries();
  }, [startSearch]);

  const onChangeHandler = (e) => {
    SetContent(e.target.innerHTML);
  };

  return (
    <JournalContainer>
      <ScrollContainer>
        {/* map over all entries and create journal entires */}
        <JournalEntry>
          <Date>{getDate()}</Date>
          <Title
            type="text"
            placeholder="Product Name"
            maxlength="5000"
            data-name="title-input"
            spellcheck="false"
          ></Title>
          <WritingContainer
            contentEditable="true"
            value={content}
            onInput={onChangeHandler}
            suppressContentEditableWarning={true}
          >
            <ul>
              <li data-placeholder={placeholder}></li>
            </ul>
          </WritingContainer>
        </JournalEntry>
      </ScrollContainer>
    </JournalContainer>
  );
};

export default Journal;

const JournalContainer = styled.div`
  display: flex;
  flex: 1 0 0;
  padding: 10vh 15vw 10vh 25vw;
  position: relative;
`;

const ScrollContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  min-width: 95%;
  min-height: 50%;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;

  &::after {
    /* will have to adjust width for responsiveness */
    content: "";
    background: linear-gradient(-180deg, #fff 78%, hsla(0, 0%, 100%, 0));
    width: 60%;
    height: 10%;
    position: fixed;
    top: 0%;
  }
`;

const Title = styled.input`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0;
  width: 95%;
  outline: none;
  border: none;
  background: transparent;
  line-height: normal;
  margin: 2.75rem 0 1.05rem;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 1.15;
  font-size: 1.728em;
`;

const WritingContainer = styled.div`
  word-break: break-word;
  outline: none;

  & > ul {
    list-style-type: disc;
    margin-left: 19px;
  }

  & > ul > li::before {
    content: attr(data-placeholder);
    color: #e9e9e9;
  }
`;

const JournalEntry = styled.div`
  margin-bottom: 50px;
  &::before {
    content: "";
    background: #e9e9e9;
    width: 100%;
    margin-top: 30px;
    height: 2px;
    position: absolute;
    bottom: 0%;
  }
`;

const Date = styled.h1``;
