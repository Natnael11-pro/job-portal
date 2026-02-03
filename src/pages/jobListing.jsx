import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { City } from "country-state-city";
import { BarLoader } from "react-spinners";

import useFetch from "@/hooks/use-fetch";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

// Debounce helper
const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const JobListing = () => {
  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");

  const debouncedSearch = useDebounce(searchQuery);

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);
  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id: companyId,
    searchQuery: debouncedSearch,
  });

  // Memoized cities (performance fix)
  const cities = useMemo(
    () => City.getCitiesOfCountry("ET") || [],
    []
  );

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    // Call jobs fetch whenever relevant filters change
    if (isLoaded) fnJobs();
<<<<<<< HEAD
  }, [isLoaded, location, companyId, debouncedSearch]);
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    // Always set the state (allows clearing when input is empty)
    setSearchQuery(query ? String(query) : "");
  };
>>>>>>> f8e90d9850112fbfc694f118913ed8286d4f6253

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompanyId("");
  };

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl text-center pb-8">
        Latest Jobs
      </h1>
<<<<<<< HEAD

      <Input
        placeholder="Search jobs by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
        aria-label="Search jobs"
      />
=======
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>
>>>>>>> f8e90d9850112fbfc694f118913ed8286d4f6253

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
<<<<<<< HEAD
              {cities.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
=======
              {City.getCitiesOfCountry("ET").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
>>>>>>> f8e90d9850112fbfc694f118913ed8286d4f6253
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={companyId} onValueChange={setCompanyId}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ id, name }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="destructive" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {loadingJobs && <BarLoader className="mt-4" width={"100%"} />}

      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job.saved?.length > 0}
              />
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
