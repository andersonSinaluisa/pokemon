interface GetByAuthorResponse{
    id:        number;
    name:      string;
    image:     string;
    attack:    number;
    defense:   number;
    hp:        number;
    type:      string;
    id_author: number;
}


interface CreateRequest{
    name:     string;
    image:    string;
    attack:   number;
    defense:  number;
    hp:       number;
    type:     string;
    idAuthor: number;
}


interface EditRequest{
    name:     string;
    image:    string;
    attack:   number;
    defense:  number;
    hp:       number;
    type:     string;
    idAuthor: number;
}


interface CreateResponse extends GetByAuthorResponse{

}

interface EditResponse extends GetByAuthorResponse{

}



export type {
    GetByAuthorResponse,
    CreateRequest,
    CreateResponse,
    EditRequest,
    EditResponse
}