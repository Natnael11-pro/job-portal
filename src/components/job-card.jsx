/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useUser } from "@clerk/clerk-react";

import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const { user } = useUser();
  const [saved, setSaved] = useState(savedInit);

  const { loading: deleting, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: saving,
    data: savedJob,
    fn: fnSaveJob,
  } = useFetch(saveJob);

  const handleSaveJob = async () => {
    if (saving) return;

    await fnSaveJob({
      user_id: user.id,
      job_id: job.id,
    });

    onJobAction();
  };

  const handleDeleteJob = async () => {
    if (deleting) return;

    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) {
      setSaved(Array.isArray(savedJob) && savedJob.length > 0);
    }
  }, [savedJob]);

  const shortDescription =
    job.description?.split(".")[0] ?? "No description available";

  return (
    <Card className="flex flex-col">
      {deleting && <BarLoader width="100%" color="#36d7b7" />}

      <CardHeader>
        <CardTitle className="flex justify-between">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              size={18}
              className="text-red-400 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          {job.company?.logo_url && (
            <img
              src={job.company.logo_url}
              alt={`${job.company.name} logo`}
              className="h-6"
            />
          )}
          <div className="flex gap-2 items-center text-sm">
            <MapPinIcon size={14} /> {job.location}
          </div>
        </div>
        <hr />
        <p>{shortDescription}.</p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            onClick={handleSaveJob}
            disabled={saving}
            aria-label="Save job"
          >
            <Heart
              size={20}
              fill={saved ? "red" : "none"}
              stroke={saved ? "red" : "currentColor"}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
