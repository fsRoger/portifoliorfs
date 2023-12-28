import { PageIntroduction } from "../Components/pages/projects/page-introduction";
import { ProjectsList } from "../Components/pages/projects/projects-list";
import { fetchHygraphQuery } from "../utils/fetch-hygraph-query";
import { ProjectsPageData } from "../types/page-info";

export const metadata = {
  title: 'Projetos',
}

const getPageData = async (): Promise<ProjectsPageData> => {
  const query = `
  query ProjectsQuery {
    projects {
      shortDescription
      slug
      title
      thumbnail {
        url
      }
      technologies {
        name
      }
    }
  }
  `
  return fetchHygraphQuery(
    query,
    10

  )
}

export default async function Projects() {
  const { projects } = await getPageData();
  return (
    <>
      <PageIntroduction />
      <ProjectsList projects={projects} />
    </>
  )
}