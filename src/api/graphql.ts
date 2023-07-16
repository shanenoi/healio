import axios from 'axios'

const ANON_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZWtub29pYXVkaHpzeHV2cmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk0NDkwNzEsImV4cCI6MTk5NTAyNTA3MX0.J5Ur9wOA8obkBCKnI5tz7DJkeU4m3J7MPmQpdDjWu3U'
const GRAPHQL_URL = 'https://ykeknooiaudhzsxuvrhy.supabase.co/graphql/v1'

export interface GraphQLQueryProps {
    query: string
    variables: any
}

export class GraphQLClient {
    private readonly apiKey: string
    private readonly url: string

    constructor(apiKey = ANON_API_KEY, url = GRAPHQL_URL) {
        this.apiKey = apiKey
        this.url = url
    }

    public WithAPIKey(apiKey: string): GraphQLClient {
        return new GraphQLClient(apiKey, this.url)
    }

    public async Send(props: GraphQLQueryProps): Promise<any> {
        const data = JSON.stringify({query: props.query, variables: props.variables})
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.url,
            headers: {
                apiKey: this.apiKey,
                'content-type': 'application/json'
            },
            data
        }

        try {
            const response = await axios.request(config)
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
