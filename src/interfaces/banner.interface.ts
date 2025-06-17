import { IDatabaseDefaultProps } from "./db.interface";

export interface IBanner extends IDatabaseDefaultProps {
  label: string;
  image_url: string;
  website: string;
  screen_name: string;
  note: string;
  added_by: string;
}
