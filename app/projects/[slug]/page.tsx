import { ProjectDetails } from "@/app/Components/pages/project/project-details";
import { ProjectSections } from "../../Components/pages/project/project-sections";
import { fetchHygraphQuery } from "@/app/utils/fetch-hygraph-query";
import { ProjectPageData, ProjectsPageStaticData } from "@/app/types/page-info";
import { Metadata } from 'next/head';

export const metadata = {
  title: 'Project',
}

type ProjectProps = {
  params: {
    slug: string;
  }

}

const getProjectDetails = async (slug: string): Promise<any> => {
  const query = `
  query ProjectQuery() {
    project(where: {slug: "${slug}"}) {
      pageThumbnail {
        url
      }
      thumbnail {
        url
      }
      sections {
        title
        image {
          url
        }
      }
      title
      shortDescription
      description {
        raw
        text
      }
      technologies {
        name
      }
      liveProjectUrl
      githubUrl
    }
  }
  `
  return fetchHygraphQuery(
    query,
    10

  );
}


export default async function Project({ params: { slug } }: ProjectProps) {
  const { project } = await getProjectDetails(slug)
  return (
    <>
      <ProjectDetails project={project} />
      <ProjectSections sections={project.sections} />
    </>
  )
}

export async function generateStaticParams() {
  const query = `
    query ProjectsSlugsQuery(){
      projects(first: 100) {
        slug
      }
    }
  `

  const { projects } = await fetchHygraphQuery<ProjectsPageStaticData>(query)

  return projects
}

export async function generateMetadata({
  params: { slug }
}: ProjectProps): Promise<Metadata> {
  const data = await getProjectDetails(slug)
  const project = data.project;

  return {
    title: project.title,
    description: project.description.text,
    openGraph: {
      images: [
        {
          url: project.thumbnail.url,
          width: 1200,
          height: 630,
        }
      ]
    }
  }
}
