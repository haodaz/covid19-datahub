import React from "react";
import { graphql } from "gatsby";
import { LeftOutlined } from "@ant-design/icons";
import { makePage } from "../components/Layout";
// import { ExternalLink } from "../components/ExternalLink";
import NewList from "../components/NewList";
import InfoList from "../components/InfoList";
import Help from "../components/Help";
import indexTitleImg from "../img/bg.jpg";
import {
  translateCourseOperationStatus,
  formatDate
} from "../components/display";

const help = {
  title: "校友问题征集",
  linkTxt: "在海外遇到了什么问题？告诉我们，尽力为你寻求答案",
  linkTo: "https://github.com/applysquare/covid19-datahub"
};

const styles = {
  title: {
    color: "#333333",
    fontWeight: 500,
    fontSize: "18px",
    marginBottom: "24px"
  },
  logoBox: {
    backgroundImage: `url(${indexTitleImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
    height: "168px"
  },
  mask: {
    background: "rgba(0,0,0,0.53)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  maskContent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: "20px 15px"
  },
  logoTitle: {
    fontSize: "14px",
    color: "#FFFFFF"
  },
  nameCn: {
    fontWeight: 500,
    fontSize: "24px",
    color: "#FFFFFF",
    width: "90%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  nameEn: {
    fontSize: "12px",
    color: "#FFFFFF",
    width: "90%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  policy: {
    padding: "24px 15px",
    background: "#FFFFFF",
    marginTop: "10px",
    boxShadow: "0px 2px 6px 0px rgba(0,0,0,0.08)"
  },
  flexParent: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  flexChild: {
    textAlign: "center"
  },
  areaName: {
    fontSize: "14px",
    color: "#666666"
  },
  illnessTxt: {
    color: "#333333",
    fontSize: "14px"
  },
  illnessNum: {
    fontSize: "20px"
  },
  localEpidemicBox: {
    background: "#FFFFFF",
    boxShadow: "0px 6px 6px 0px rgba(0,0,0,0.08)",
    padding: "24px 15px"
  },
  infoBox: {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.1)",
    borderRadius: "4px",
    padding: "20px 10px"
  },
  more: {
    color: "#999999",
    fontSize: "14px",
    padding: "5px",
    display: "inline-block",
    textDecoration: "underline",
    cursor: "default"
  },
  link: {
    textDecoration: "none",
    color: "#FFFFFF"
  }
};

const domainURI = (str = "") => {
  const durl = /.*:\/\/([^/]*).*/;
  const domain = str.match(durl);
  return domain && domain[1] ? domain[1] : str;
};
const goBack = () => {
  window.history.back();
};

const InstitutePageCore = ({ data, errors }) => {
  if (errors) {
    console.error(errors);
  }
  const { area, institute = {}, articles, updates } = data || {};
  const {
    cover,
    logo,
    nameCn,
    nameEn,
    stateCn,
    numStateCases,
    numStateDailyNewCases,
    numStateDeaths,
    courseOperationStatus,
    onlineCourseStartDate,
    onCampusCourseResumeDate,
    coursePolicyLink
  } = institute;

  const infoEdges = articles?.edges || [];
  const timeStamp = new Date(onlineCoursestartdate);
  const time = `${timeStamp.getFullYear()}-${timeStamp.getMonth() +
    1}-${timeStamp.getHours()}`;

  return (
    <div style={{ background: "rgba(241,241,241,0.8)" }}>
      <div
        style={{
          ...styles.logoBox,
          backgroundImage: `url(${cover})`
        }}
      >
        <div style={styles.mask}></div>
        <div style={styles.maskContent}>
          <div style={styles.logoTitle}>
            <button style={styles.link} onClick={goBack}>
              <LeftOutlined />
              <span style={{ padding: "0 4px" }}>院校列表</span>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "36px 0 24px 6px"
            }}
          >
            <span>
              <img
                src={logo}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </span>
            <span style={{ paddingLeft: "12px", flex: 1 }}>
              <div style={styles.nameCn}>{nameCn}</div>
              <div style={styles.nameEn}>{nameEn}</div>
            </span>
          </div>
        </div>
      </div>
      <div style={styles.localEpidemicBox}>
        <div
          style={{
            ...styles.flexParent,
            justifyContent: "space-between",
            marginBottom: "24px",
            alignItems: "center"
          }}
        >
          <div style={{ ...styles.title, margin: 0 }}>所在州疫情</div>
          <div style={styles.areaName}>
            {stateCn}，{area?.titleCn}
          </div>
        </div>
        <div style={styles.flexParent}>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>确诊病例</div>
            <div style={{ ...styles.illnessNum, color: "#EB5449" }}>
              {numStateCases}
            </div>
          </div>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>昨日新增</div>
            <div style={{ ...styles.illnessNum, color: "#FDBB0F" }}>
              {numStateDailyNewCases}
            </div>
          </div>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>死亡人数</div>
            <div style={{ ...styles.illnessNum, color: "#333333" }}>
              {numStateDeaths}
            </div>
          </div>
          <div style={styles.flexChild}>
            <div style={styles.illnessTxt}>治愈人数</div>
            <div style={{ ...styles.illnessNum, color: "#1EC5A0" }}>2153</div>
          </div>
        </div>
      </div>

      <div style={styles.policy}>
        <div style={styles.title}>院校政策</div>
        <div style={styles.flexParent}>
          <div style={styles.flexChild}>
            <div>院校运转</div>
            <div>
              {(courseOperationStatus &&
                translateCourseOperationStatus("cn", courseOperationStatus)) ??
                "-"}
            </div>
          </div>
          <div style={styles.flexChild}>
            <div>停课时间</div>
            <div>
              {(onlineCourseStartDate && formatDate(onlineCourseStartDate)) ??
                "-"}
            </div>
          </div>
          <div style={styles.flexChild}>
            <div>复课时间</div>
            <div style={styles.title}>
              {(onCampusCourseResumeDate &&
                formatDate(onCampusCourseResumeDate)) ??
                "-"}
            </div>
          </div>
        </div>
        <div>
          <span style={{ fontSize: "14px" }}>院校政策：</span>
          <a href={coursePolicyLink} style={{ textDecoration: "none" }}>
            {domainURI(coursePolicyLink)}
          </a>
        </div>
      </div>
      <Help {...help} />

      <div style={{ background: "#FFFFFF", padding: "15px" }}>
        <div style={styles.dataAreaBox}>
          <div
            style={{ ...styles.title, fontSize: "18px", marginBottom: "10px" }}
          >
            本校资料区
          </div>
          <InfoList infoEdges={infoEdges} />
        </div>
        <div>
          <div
            style={{
              ...styles.title,
              margin: "30px 0 22px 0"
            }}
          >
            资讯
          </div>
          <NewList newEdges={updates?.edges} />
        </div>
      </div>
    </div>
  );
};

const Page = makePage(InstitutePageCore);
export default Page;

export const pageQuery = graphql`
  query InstitutePage($id: String!, $slug: String!, $countryCode: String!) {
    area(countryCode: { eq: $countryCode }) {
      id
      countryCode
      titleCn
    }
    institute(id: { eq: $id }) {
      id
      logo
      nameCn
      nameEn
      website
      stateCn
      coursePolicyLink
      cover
      numStateCases
      numStateDailyNewCases
      numStateDeaths
      courseOperationStatus
      onlineCourseStartDate
      onCampusCourseResumeDate
      fields {
        pathname
      }
    }
    updates: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { instituteSlug: { eq: $slug } }
        fields: { templateKey: { eq: "update-page" } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            pathname
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { instituteSlug: { eq: $slug } }
        fields: { templateKey: { eq: "article-page" } }
      }
    ) {
      edges {
        node {
          id
          fields {
            pathname
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
