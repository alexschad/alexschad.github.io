import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import data from "./thingsimade.json";
import images from "../images/*.*";
import { motion, AnimatePresence } from "framer-motion";

function ThingsIMade() {
  const [selectedTags, setSelectedTags] = useState([]);

  let allTags = [];
  data.forEach((d) => {
    allTags = allTags.concat(d.tags);
  });
  allTags = new Set(allTags);
  allTags = [...allTags];

  const selectTag = (t) => {
    return (e) => {
      setSelectedTags((oldTags) => {
        const newTags = [...oldTags];
        const idx = newTags.indexOf(t);
        if (idx === -1) {
          newTags.push(t);
        } else {
          newTags.splice(idx, 1);
        }
        return newTags;
      });
    };
  };

  const allTagsRenderd = allTags.map((t) => {
    return (
      <div
        className={`tag ${selectedTags.indexOf(t) > -1 ? "selected" : ""}`}
        onClick={selectTag(t)}
        key={t}
      >
        {t}
      </div>
    );
  });

  const itemsFilterd = data.filter((i) => {
    return selectedTags.every((t) => i.tags.includes(t));
  });

  const items = itemsFilterd.map((d) => {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          transition: { delay: 0.5, type: "spring" },
        }}
        exit={{
          opacity: 0,
          transition: { delay: 0.5 },
        }}
        layout
        className="work flex col-md-4"
        key={d.key}
      >
        <div className="work-wrapper">
          <div className="logo">
            <img src={images[d.image.split(".")[0]][d.image.split(".")[1]]} />
          </div>
          <div className="detail">
            <h4>{d.title}</h4>
            {d.details}
            <div className="workfor">{d.workfor}</div>
            <div className="tags">
              {d.tags.map((t) => (
                <div
                  className={`tag ${
                    selectedTags.indexOf(t) > -1 ? "selected" : ""
                  }`}
                  onClick={selectTag(t)}
                  key={t}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  });
  return (
    <>
      <div className="tags">{allTagsRenderd}</div>
      <div className="row">
        <AnimatePresence>{items}</AnimatePresence>
      </div>
    </>
  );
}

function init() {
  const domNode = document.getElementById("things-i-made");
  const root = createRoot(domNode);
  root.render(<ThingsIMade />);
}

const winLoad = (callback) => {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
  }
};

winLoad(init);
