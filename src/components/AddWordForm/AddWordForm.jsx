import React, { useState } from "react";
import {
  BtnBox,
  CancelBtn,
  Form,
  InputBox,
  Item,
  LabelBox,
  SelectWrapper,
  SubmitBtn,
  Text,
  Title,
  VerbTypeBox,
} from "./AddWordForm.styled";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/word/selectors";
import sprite from "../../images/sprite.svg";
import { createWordThunk } from "../../redux/word/operations";

const customStyles = {
  container: (baseStyles, state) => ({
    ...baseStyles,
    marginBottom: "8px",
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "15px",
    border: "1px solid #D1D5DB",
    height: "48px",
    backgroundColor: "transparent",
  }),
  valueContainer: (baseStyles, state) => ({
    ...baseStyles,
    paddingLeft: "24px",
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    color: "#FCFCFC",
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "#FCFCFC",
    textTransform: "capitalize",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    textTransform: "capitalize",
  }),
  indicatorSeparator: (baseStyles, state) => ({
    ...baseStyles,
    display: "none",
  }),
  indicatorsContainer: (baseStyles, state) => ({
    ...baseStyles,
    paddingRight: "12px",
  }),
  indicatorContainer: (baseStyles, state) => ({
    ...baseStyles,
    padding: 0,
  }),
};

const AddWordForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const options = categories?.map((category) => ({
    value: category,
    label: category,
  }));

  const [category, setCategory] = useState("");
  const [isIrregularVerb, setIsIrregularVerb] = useState(false);
  const [wordUa, setWordUa] = useState("");
  const [wordEn, setWordEn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      category: category.value,
      ua: wordUa,
      en: wordEn,
      ...(category.value === "verb" && { isIrregular: isIrregularVerb }),
    };

    dispatch(createWordThunk(formData));
    setCategory("");
    setWordUa("");
    setWordEn("");
    onClose();
  };

  return (
    <>
      <Title>Add word</Title>
      <Text>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </Text>
      <Form onSubmit={handleSubmit}>
        <SelectWrapper>
          <Select
            options={options}
            styles={customStyles}
            onChange={setCategory}
            value={category}
          />
        </SelectWrapper>
        {category.value === "verb" && (
          <VerbTypeBox>
            <label htmlFor="regular">
              <input
                type="radio"
                id="regular"
                name="verbType"
                checked={!isIrregularVerb}
                onChange={() => setIsIrregularVerb(false)}
              />
              Regular
            </label>
            <label htmlFor="irregular">
              <input
                type="radio"
                id="irregular"
                name="verbType"
                checked={isIrregularVerb}
                onChange={() => setIsIrregularVerb(true)}
              />
              Irregular
            </label>
          </VerbTypeBox>
        )}
        <InputBox>
          <Item>
            <LabelBox>
              <svg>
                <use href={`${sprite}#ua`} />
              </svg>
              <label htmlFor="ua">Ukrainian</label>
            </LabelBox>
            <input
              type="text"
              id="ua"
              placeholder="Працювати"
              onChange={(e) => setWordUa(e.target.value)}
              value={wordUa}
            />
          </Item>
          <Item>
            <LabelBox>
              <svg>
                <use href={`${sprite}#en`} />
              </svg>
              <label htmlFor="en">English</label>
            </LabelBox>
            <input
              type="text"
              id="en"
              placeholder="Work"
              onChange={(e) => setWordEn(e.target.value)}
              value={wordEn}
            />
          </Item>
        </InputBox>
        <BtnBox>
          <SubmitBtn type="submit">Add</SubmitBtn>
          <CancelBtn type="button" onClick={onClose}>
            Cancel
          </CancelBtn>
        </BtnBox>
      </Form>
    </>
  );
};

export default AddWordForm;
