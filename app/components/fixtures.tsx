export default function Fixtures({fixtures}) {
  return (
    <>
    <h3>this where we display the fixtures</h3>
    {/* iterate through the prop and call <Fixture/> component for every object*/}
    {fixtures.map((fixture) => {
      return (
        <>
          <h4>{fixture.team_h} vs {fixture.team_a}</h4>
          <p>kickoff: {fixture.kickoff_time}</p>
        </>
      )
    })}
    </>
  )
}