export interface Project {
  id: string;
  titre: string;
  desc: string;
  dateCrea: Date;
  username: string;
  nbTodo: number;
  nbInProgress: number;
  nbTest: number;
  nbDone: number;
  nbValid: number;
}
